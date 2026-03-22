package com.example.TheHeathensStore.dao;



import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.TheHeathensStore.entity.User;

import java.util.List;

@Repository
@Transactional
public class UserDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public void add(User user) {
		Session session = sessionFactory.getCurrentSession();
		session.persist(user);
	}

	public User get(long id) {
		Session session = sessionFactory.getCurrentSession();
		return session.find(User.class, id);
	}

	public List<User> getAll() {
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery("FROM User", User.class).getResultList();
	}

	public User getByUsername(String username) {
		Session session = sessionFactory.getCurrentSession();
		String hql = "FROM User WHERE username = :username";
		return session.createQuery(hql, User.class).setParameter("username", username).uniqueResult();
	}

	public void update(User user) {
		Session session = sessionFactory.getCurrentSession();
		session.merge(user);
	}

	public void delete(long id) {
		Session session = sessionFactory.getCurrentSession();
		User user = session.find(User.class, id);
		if (user != null) {
			session.remove(user);
		}
	}
}
