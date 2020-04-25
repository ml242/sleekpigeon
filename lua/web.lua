local web = {}

function web.get(domain)

    local http = require "resty.http"
    local httpc = http.new()
    local res, err = httpc:request_uri(domain, {
        method = "GET",
        keepalive_timeout = 60000,
        keepalive_pool = 10,
        ssl_verify = false
    })

    if not res then
        ngx.log(ngx.ERR, "failed to request: ", err)
        return
    end

    return res
end

return web
