/* eslint-disable */
import md5 from "md5";
import request from "@zeelyn/http";
import { ElNotification } from "element-plus";

export function BaiduTranslate(store, query, from, to, callback, _err, _finally) {
    var salt = new Date().getTime();
    var sign_source = `${store.baidu.appid}${query}${salt}${store.baidu.key}`;
    request
        .get("http://api.fanyi.baidu.com/api/trans/vip/translate", {
            params: {
                q: query,
                appid: store.baidu.appid,
                salt: salt,
                from: from,
                to: to,
                tts: 1,
                dict: 1,
                sign: md5(sign_source),
            },
        })
        .then((res) => {
            if (res.data.error_code) {
                ElNotification.error({
                    message: res.data.error_msg,
                    position: "bottom-right",
                });
            } else callback({ result: res.data.trans_result });
        })
        .catch((err) => {
            if (_err) _err(err);
        })
        .finally(() => {
            if (_finally) _finally();
        });
}
