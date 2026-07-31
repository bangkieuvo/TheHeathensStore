package com.example.TheHeathensStore.repository.specification;

import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.Team;
import com.example.TheHeathensStore.filter.ProductFilter;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Path;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.ArgumentCaptor;
import org.springframework.data.jpa.domain.Specification;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ProductSpecificationTest {

    private Root<Product> root;
    private CriteriaQuery<?> query;
    private CriteriaBuilder criteriaBuilder;
    private Predicate activePredicate;
    private Predicate combinedPredicate;

    @BeforeEach
    void setUp() {
        root = mock(Root.class);
        query = mock(CriteriaQuery.class);
        criteriaBuilder = mock(CriteriaBuilder.class);

        Path<Boolean> activePath = mock(Path.class);
        activePredicate = mock(Predicate.class);
        combinedPredicate = mock(Predicate.class);

        when(root.<Boolean>get("isActive")).thenReturn(activePath);
        when(criteriaBuilder.isTrue(activePath)).thenReturn(activePredicate);
        when(criteriaBuilder.and(any(Predicate[].class))).thenReturn(combinedPredicate);
    }

    @Test
    void shouldSearchByProductNameDescriptionAndTeamNameUsingOr() {
        ProductFilter filter = new ProductFilter();
        filter.setKeyword("  ManChEsTer  ");

        Path<String> namePath = mock(Path.class);
        Path<String> descriptionPath = mock(Path.class);
        Join<Product, Team> teamJoin = mock(Join.class);
        Path<String> teamNamePath = mock(Path.class);
        Expression<String> lowerName = mock(Expression.class);
        Expression<String> lowerDescription = mock(Expression.class);
        Expression<String> lowerTeamName = mock(Expression.class);
        Predicate namePredicate = mock(Predicate.class);
        Predicate descriptionPredicate = mock(Predicate.class);
        Predicate teamPredicate = mock(Predicate.class);
        Predicate keywordPredicate = mock(Predicate.class);

        when(root.<String>get("name")).thenReturn(namePath);
        when(root.<String>get("description")).thenReturn(descriptionPath);
        when(root.<Product, Team>join("team", JoinType.LEFT)).thenReturn(teamJoin);
        when(teamJoin.<String>get("name")).thenReturn(teamNamePath);
        when(criteriaBuilder.lower(namePath)).thenReturn(lowerName);
        when(criteriaBuilder.lower(descriptionPath)).thenReturn(lowerDescription);
        when(criteriaBuilder.lower(teamNamePath)).thenReturn(lowerTeamName);
        when(criteriaBuilder.like(lowerName, "%manchester%")).thenReturn(namePredicate);
        when(criteriaBuilder.like(lowerDescription, "%manchester%")).thenReturn(descriptionPredicate);
        when(criteriaBuilder.like(lowerTeamName, "%manchester%")).thenReturn(teamPredicate);
        when(criteriaBuilder.or(namePredicate, descriptionPredicate, teamPredicate)).thenReturn(keywordPredicate);

        Predicate result = toPredicate(filter);

        assertSame(combinedPredicate, result);
        verify(root).join("team", JoinType.LEFT);
        verify(criteriaBuilder).or(namePredicate, descriptionPredicate, teamPredicate);
        verify(criteriaBuilder).like(lowerName, "%manchester%");
        verify(criteriaBuilder).like(lowerDescription, "%manchester%");
        verify(criteriaBuilder).like(lowerTeamName, "%manchester%");
        assertAndPredicates(activePredicate, keywordPredicate);
    }

    @ParameterizedTest
    @NullAndEmptySource
    @ValueSource(strings = {" ", "   ", "\t"})
    void shouldIgnoreNullEmptyOrBlankKeyword(String keyword) {
        ProductFilter filter = new ProductFilter();
        filter.setKeyword(keyword);

        Predicate result = toPredicate(filter);

        assertSame(combinedPredicate, result);
        verify(root, never()).join("team", JoinType.LEFT);
        verify(criteriaBuilder, never()).or(any(Predicate[].class));
        assertAndPredicates(activePredicate);
    }

    @Test
    void shouldCombineKeywordWithExistingFilterUsingAnd() {
        ProductFilter filter = new ProductFilter();
        filter.setKeyword("united");
        filter.setTeamName("Manchester");

        Predicate keywordPredicate = stubKeywordPredicate("united");
        Join<Product, Team> filterTeamJoin = mock(Join.class);
        Path<String> filterTeamNamePath = mock(Path.class);
        Expression<String> lowerFilterTeamName = mock(Expression.class);
        Predicate teamFilterPredicate = mock(Predicate.class);

        when(root.<Product, Team>join("team", JoinType.INNER)).thenReturn(filterTeamJoin);
        when(filterTeamJoin.<String>get("name")).thenReturn(filterTeamNamePath);
        when(criteriaBuilder.lower(filterTeamNamePath)).thenReturn(lowerFilterTeamName);
        when(criteriaBuilder.like(lowerFilterTeamName, "%manchester%")).thenReturn(teamFilterPredicate);

        Predicate result = toPredicate(filter);

        assertSame(combinedPredicate, result);
        assertAndPredicates(activePredicate, keywordPredicate, teamFilterPredicate);
    }

    private Predicate stubKeywordPredicate(String keyword) {
        Path<String> namePath = mock(Path.class);
        Path<String> descriptionPath = mock(Path.class);
        Join<Product, Team> teamJoin = mock(Join.class);
        Path<String> teamNamePath = mock(Path.class);
        Expression<String> lowerName = mock(Expression.class);
        Expression<String> lowerDescription = mock(Expression.class);
        Expression<String> lowerTeamName = mock(Expression.class);
        Predicate namePredicate = mock(Predicate.class);
        Predicate descriptionPredicate = mock(Predicate.class);
        Predicate teamPredicate = mock(Predicate.class);
        Predicate keywordPredicate = mock(Predicate.class);
        String pattern = "%" + keyword + "%";

        when(root.<String>get("name")).thenReturn(namePath);
        when(root.<String>get("description")).thenReturn(descriptionPath);
        when(root.<Product, Team>join("team", JoinType.LEFT)).thenReturn(teamJoin);
        when(teamJoin.<String>get("name")).thenReturn(teamNamePath);
        when(criteriaBuilder.lower(namePath)).thenReturn(lowerName);
        when(criteriaBuilder.lower(descriptionPath)).thenReturn(lowerDescription);
        when(criteriaBuilder.lower(teamNamePath)).thenReturn(lowerTeamName);
        when(criteriaBuilder.like(lowerName, pattern)).thenReturn(namePredicate);
        when(criteriaBuilder.like(lowerDescription, pattern)).thenReturn(descriptionPredicate);
        when(criteriaBuilder.like(lowerTeamName, pattern)).thenReturn(teamPredicate);
        when(criteriaBuilder.or(namePredicate, descriptionPredicate, teamPredicate)).thenReturn(keywordPredicate);
        return keywordPredicate;
    }

    private Predicate toPredicate(ProductFilter filter) {
        Specification<Product> specification = ProductSpecification.filterProduct(filter);
        return specification.toPredicate(root, query, criteriaBuilder);
    }

    private void assertAndPredicates(Predicate... expectedPredicates) {
        ArgumentCaptor<Predicate[]> captor = ArgumentCaptor.forClass(Predicate[].class);
        verify(criteriaBuilder).and(captor.capture());
        assertArrayEquals(expectedPredicates, captor.getValue());
    }
}
