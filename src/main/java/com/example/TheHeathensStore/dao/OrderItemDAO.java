package com.example.TheHeathensStore.dao;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.TheHeathensStore.entity.OrderItem;

import java.util.List;

@Repository
@Transactional
public class OrderItemDAO {

    @Autowired
    private SessionFactory sessionFactory;

    public void save(OrderItem orderItem) {
        Session session = sessionFactory.getCurrentSession();
        session.persist(orderItem);
    }

    public OrderItem get(Long id) {
        Session session = sessionFactory.getCurrentSession();
        return session.find(OrderItem.class, id);
    }

    public List<OrderItem> getByOrderId(Long orderId) {
        Session session = sessionFactory.getCurrentSession();
        return session.createQuery("FROM OrderItem WHERE order.id = :orderId", OrderItem.class)
                .setParameter("orderId", orderId)
                .getResultList();
    }

    public void delete(Long id) {
        Session session = sessionFactory.getCurrentSession();
        OrderItem orderItem = session.find(OrderItem.class, id);
        if (orderItem != null) session.remove(orderItem);
    }
}
