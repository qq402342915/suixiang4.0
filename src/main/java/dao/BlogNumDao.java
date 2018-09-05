package dao;

import entity.BlogNum;

import java.util.List;

public interface BlogNumDao {
    public List<BlogNum> searchNum(int blogId);
}
