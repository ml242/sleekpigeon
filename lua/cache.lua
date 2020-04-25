local cache = {}

function cache.set(url, res)
    local memc = borrowMemcached()

    local ok, err = memc:set(url .. "body", res.body, 10)
    local ok, err = memc:set(url .. "status", res.status, 10)
    local ok, err = memc:set(url .. "headers", res.headers, 10)

    if not ok then
        ngx.log(ngx.ERR, "failed to set cache: ", err)
        return
    end

    returnMemcached(memc)
end

function cache.get(url)

    local memc = borrowMemcached()
    local res = {}

    res.body = fetch(memc, url .. "body")
    res.status = fetch(memc, url .. "status")
    res.headers = fetch(memc, url .. "headers")

    returnMemcached(memc)

    return res
end

function borrowMemcached()
    local memcached = require "resty.memcached"
    local memc, err = memcached:new()

    if not memc then
        ngx.log(ngx.ERR, "failed to instantiate memc: ", err)
        return
    end

    memc:set_timeout(1000) -- 1 sec

    local ok, err = memc:connect("memcached", 11211)
    if not ok then
        ngx.log(ngx.ERR, "failed to connect: ", err)
        return
    end

    return memc
end

-- put it into the connection pool of size 100,
-- with 10 seconds max idle timeout
function returnMemcached(memc)
    local ok, err = memc:set_keepalive(10000, 100)
    if not ok then
        ngx.log(ngx.ERR, "cannot set keepalive: ", err)
        return
    end
end

function fetch(memc, key)
    local res, flags, err = memc:get(key)

    if err then
        ngx.log(ngx.ERR, "failed to get cache: ", err)
        return
    end

    return res
end

return cache
