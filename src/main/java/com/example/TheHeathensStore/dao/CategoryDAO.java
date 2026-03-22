package com.example.TheHeathensStore.dao;

import jakarta.transaction.TransactionScoped;

import java.util.List;
import org.hibernate.SessionFactory;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.example.TheHeathensStore.entity.Category;

@Repository
@TransactionScoped
public class CategoryDAO {

	@Autowired
	private SessionFactory sessionFactory;

	public void add(Category category) {
		Session session = sessionFactory.getCurrentSession();
		session.persist(category);
	}

	public List<Category> getAll() {
		Session session = sessionFactory.getCurrentSession();
		return session.createQuery("FROM Category", Category.class).getResultList();
	}

	public Category get(Long id) {
        Session session = sessionFactory.getCurrentSession();
		return session.get(Category.class, id);
	}

	public void update(Category category	) {
        Session session = sessionFactory.getCurrentSession();
		session.merge(category);
	}

	public void delete(Long id) {
		Category category = get(id);
		if (category != null) {
			sessionFactory.getCurrentSession().remove(category);
		}
	}
}
