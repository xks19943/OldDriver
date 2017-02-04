/**
 * Created by liaoye on 2016/12/22.
 */
import Api from '../protocol/api';
var PureModel = {
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
            var url = 'http://gank.io/api/data/福利/10/'+ page;
            Api.getRequest(url,'get','').then((data)=>{
                if (!data || data == null) {
                    reject(data);
                    return;
                }
                resolve(data.results);
            }).catch((e)=>{

            })
        })
    }
};

module.exports = PureModel;