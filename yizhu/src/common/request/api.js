import {
    get,
    post
} from './http'
// 首页获取全部房源信息
export const GetALL = p => get('/room/indexRoomHouseInfo/whole', p);
// 首页获取高端房源信息
export const GetHard = p => get('/room/indexRoomHouseInfo/hardcover', p);
// 首页获取经济房源信息
export const GetEco = p => get('/room/indexRoomHouseInfo/economics', p);
// 筛选房源获取特点
export const GetTd = p => get('/data/SUPPORT', p);
// 获取地理位置
export const GetWz = p => get('/room/findZipCodeNum/440300', p);
// 查询房间
export const PostFj= p => post('/room/fingRoomInofoListByFilter', p);
// 查询房间详细信息
export const GetSingle= p => get('room/singleHouseInfo/'+p);
// 查询单间房间详细信息
export const GetSingleRoom= p => get(`/room/${p}/fast`);
// 查询所有类型房源信息
export const GetAllOrigin= p => get(`/room/findIndexHouseFullInformationByType/${p}`);
// 发送验证码
export const GetYzm= p => get(`/public/send/${p}`);
// 登录
export const Login= p => post(`public/codeLogin`,p);