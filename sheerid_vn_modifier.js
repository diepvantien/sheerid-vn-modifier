
if (typeof window.sheeridVNModifierActive === 'undefined') {
    window.sheeridVNModifierActive = true;

    window.originalFetchIfNotStored = window.originalFetchIfNotStored || window.fetch;

    console.log("%c 🇻🇳 SheerID VN Modifier đã kích hoạt! ", "background: #20c997; color: white; font-weight: bold; padding: 5px;");
    console.log("Script này sẽ thay đổi mọi tham số country thành VN cho các request tới SheerID");

    const modifyCountryParam = (url) => {
        if (typeof url !== 'string') return url;
        const urlObj = new URL(url, location.origin);
        if (urlObj.searchParams.has('country')) {
            urlObj.searchParams.set('country', 'VN');
            console.log("✅ Đã thay đổi country thành VN trong URL:", urlObj.toString());
            return urlObj.toString();
        }
        return url;
    };

    window.fetch = function (input, init) {
        if (typeof input === 'string' && input.includes("orgsearch.sheerid.net/rest/organization/search")) {
            console.log("🔍 Đã phát hiện request dạng string URL:", input);
            input = modifyCountryParam(input);
        } else if (input instanceof Request) {
            const url = input.url;
            if (url.includes("orgsearch.sheerid.net/rest/organization/search")) {
                console.log("🔍 Đã phát hiện Request URL:", url);
                const newUrl = modifyCountryParam(url);

                const newRequest = new Request(newUrl, {
                    method: input.method,
                    headers: input.headers,
                    body: input.body,
                    mode: input.mode,
                    credentials: input.credentials,
                    cache: input.cache,
                    redirect: input.redirect,
                    referrer: input.referrer,
                    integrity: input.integrity,
                    keepalive: input.keepalive,
                    signal: input.signal
                });
                console.log("✅ Gửi request đã được sửa đổi");
                return window.originalFetchIfNotStored.call(this, newRequest, init);
            }
        }
        return window.originalFetchIfNotStored.call(this, input, init);
    };

    const indicator = document.createElement('div');
    indicator.style.position = 'fixed';
    indicator.style.bottom = '10px';
    indicator.style.right = '10px';
    indicator.style.backgroundColor = '#20c997';
    indicator.style.color = 'white';
    indicator.style.padding = '5px 10px';
    indicator.style.borderRadius = '5px';
    indicator.style.fontSize = '12px';
    indicator.style.zIndex = '9999';
    indicator.style.fontWeight = 'bold';
    indicator.style.fontFamily = '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    indicator.innerHTML = '🇻🇳 SheerID VN Modifier <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background-color:#1e90ff;margin-left:3px;"></span> | Diệp Văn Tiến';
    document.body.appendChild(indicator);

    indicator.onclick = function() {
        if (window.confirm('Bạn có muốn tắt SheerID VN Modifier không?')) {
            window.fetch = window.originalFetchIfNotStored;
            window.sheeridVNModifierActive = false;
            indicator.remove();
            console.log("%c 🛑 SheerID VN Modifier đã bị tắt ", "background: #dc3545; color: white; font-weight: bold; padding: 5px;");
        }
    };

} else {
    if (window.sheeridVNModifierActive) {
        console.log("%c ⚠️ SheerID VN Modifier đã được kích hoạt rồi ", "background: #ffc107; color: black; font-weight: bold; padding: 5px;");
    } else {
        window.sheeridVNModifierActive = true;
        window.fetch = function (input, init) {
            if (typeof input === 'string' && input.includes("orgsearch.sheerid.net/rest/organization/search")) {
                input = modifyCountryParam(input);
            } else if (input instanceof Request) {
                const url = input.url;
                if (url.includes("orgsearch.sheerid.net/rest/organization/search")) {
                    const newUrl = modifyCountryParam(url);
                    const newRequest = new Request(newUrl, {
                        method: input.method,
                        headers: input.headers,
                        body: input.body,
                        mode: input.mode,
                        credentials: input.credentials,
                        cache: input.cache,
                        redirect: input.redirect,
                        referrer: input.referrer,
                        integrity: input.integrity,
                        keepalive: input.keepalive,
                        signal: input.signal
                    });
                    return window.originalFetchIfNotStored.call(this, newRequest, init);
                }
            }
            return window.originalFetchIfNotStored.call(this, input, init);
        };
        console.log("%c 🇻🇳 SheerID VN Modifier đã được kích hoạt lại! ", "background: #20c997; color: white; font-weight: bold; padding: 5px;");
    }
}
