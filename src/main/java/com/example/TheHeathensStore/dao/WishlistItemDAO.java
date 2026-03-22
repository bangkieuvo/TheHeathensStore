package com.example.TheHeathensStore.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.TheHeathensStore.entity.WishlistItem;

import java.util.List;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public class WishlistItemDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public void add(WishlistItem item) {
        Session session = sessionFactory.getCurrentSession();
        session.persist(item);
    }

    public void delete(WishlistItem item) {
        sessionFactory.getCurrentSession().remove(item);
    }
    
    public void deleteByUserIdAndProductId(Long userId, Long productId) {
        Session session = sessionFactory.getCurrentSession();
        String hql = "DELETE FROM WishlistItem WHERE userId = :userId AND product.id = :productId";
        session.createQuery(hql,Void.class)
               .setParameter("userId", userId)
               .setParameter("productId", productId)
               .executeUpdate();
    }

    public List<WishlistItem> getByUserId(Long userId) {
        Session session = sessionFactory.getCurrentSession();
        return session.createQuery("FROM WishlistItem WHERE userId = :userId", WishlistItem.class)
                      .setParameter("userId", userId)
                      .getResultList();
    }
}
