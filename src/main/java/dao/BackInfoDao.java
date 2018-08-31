package dao;

import entity.Background;

public interface BackInfoDao {
    //根据图片ID获取图片
    Background getBackById(int id);
    //通过图片路径bgPath的到图片
    Background getBackByBgPath(String bgPath);
}
