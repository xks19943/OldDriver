/**
 * Created by liaoye on 2017/2/7.
 */
import Storage from '../util/Storage';
var UserModel ={
    getUid:function () {
        return new Promise((resolve,reject)=>{
            Storage.getString('uid').then((uid)=>{
                resolve(uid);
            }).catch((e)=>{
                reject(uid);
            });
        })
    }
}

module.exports = UserModel;