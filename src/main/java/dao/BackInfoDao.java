package dao;

import entity.Background;

public interface BackInfoDao {
    //根据蹄片ID获取图片
    Background getBackById(int id);

}
