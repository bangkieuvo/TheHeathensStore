package com.example.TheHeathensStore.dao;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.TheHeathensStore.entity.Order;

import java.util.List;

@Repository
@Transactional
public class OrderDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public void save(Order order) {
        Session session = sessionFactory.getCurrentSession();
        session.persist(order);
    }

    public Order get(long id) {
        Session session = sessionFactory.getCurrentSession();
        return session.find(Order.class, id);
    }

    public List<Order> getByUserId(long userId) {
        Session session = sessionFactory.getCurrentSession();
        return session.createQuery("FROM Order WHERE user.id = :userId", Order.class)
                .setParameter("userId", userId)
                .getResultList();
    }

    public void delete(long id) {
        Session session = sessionFactory.getCurrentSession();
        Order order = session.find(Order.class, id);
        if (order != null) session.remove(order);
    }
}