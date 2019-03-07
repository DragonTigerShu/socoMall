
  //设置或跟新本地存储数据
export function setStorage(data_id, data) {
        if (data_id != "") {
            if (data) {
                var lsobj = window.localStorage;
                var datajson = JSON.stringify(data);
                lsobj.setItem(data_id, datajson);
            }
        }
    };
    //获取本地存储数据
export function getStorage(data_id) {
        if (data_id != "") {
            var data = null;
            var lsdata = window.localStorage;
            try {
                var datajson = lsdata.getItem(data_id);
                datajson = JSON.parse(datajson);
                data = datajson;
            } catch (e) {

            } finally {
                return data;
            }
        }
    };
export default function() {
  
 };


