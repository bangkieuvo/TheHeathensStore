package com.example.TheHeathensStore.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.TheHeathensStore.entity.CartItem;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class CartItemDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public void save(CartItem cartItem) {
		Session session = sessionFactory.getCurrentSession();
		session.persist(cartItem); 
	}

	public void deleteByUserId(long userId) {
		Session session = sessionFactory.getCurrentSession();
		try {
			session.createNativeQuery("CALL clearCartByUserId(:userId)",Void.class).setParameter("userId", userId).executeUpdate();
		} catch (Exception e) {
			throw new RuntimeException("Lỗi khi gọi procedure clearCartByUserId: " + e.getMessage());
		}
	}

	public void deleteByUserIdAndProductId(long userId, long productId) {
		Session session = sessionFactory.getCurrentSession();
		Optional.ofNullable(
				session.createQuery("FROM CartItem WHERE userId = :userId AND product.id = :productId", CartItem.class)
						.setParameter("userId", userId).setParameter("productId", productId).uniqueResult())
				.ifPresent(session::remove);
	}

	public CartItem getByUserIdAndProductId(long userId, long productId) {
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery("FROM CartItem WHERE userId = :userId AND product.id = :productId", CartItem.class)
				.setParameter("userId", userId).setParameter("productId", productId).uniqueResult();
	}

	public List<CartItem> getByUserId(long userId) {
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery("FROM CartItem WHERE userId = :userId", CartItem.class)
				.setParameter("userId", userId).getResultList();
	}

	public void update(CartItem item) {
		Session session = sessionFactory.getCurrentSession();
		session.merge(item); // Thay update() bằng merge()
	}
}
