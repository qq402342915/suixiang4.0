package dao;

import entity.Background;

import java.util.List;

public interface BackInfoDao {
    //根据蹄片ID获取图片
    List<Background> getBackById(int id);
    //根据图片地址获取图片
    List<Background> getBackByPath(String bgPath);
}
