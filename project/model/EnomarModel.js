/**
 * Created by liaoye on 2016/10/8.
 */

import Api from '../protocol/api';

var EnomarModel = {

    //获取首页
    firstPage:function (page) {
        return this.gotoPage(page);
    },

    //加载更多页
    nextPage:function(page){
        return this.gotoPage(page);
    },

    gotoPage:function (page) {
        return new Promise((resolve,reject)=>{
            var url = 'http://api.tianapi.com/meinv/?';
            var body = {
                "key":'29249032b9e07633b9ac883c1b6e945d',
                "num": 10,
                "page":page,
            };
            Api.getRequest(url,'get',body).then((data)=>{
                if (!data || data == null) {
                    reject(data);
                    return;
                }
                resolve(data.newslist);
            }).catch((e)=>{

            })
        })
    }
};

module.exports = EnomarModel;