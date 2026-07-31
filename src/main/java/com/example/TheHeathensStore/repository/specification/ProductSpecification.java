package com.example.TheHeathensStore.repository.specification;

import com.example.TheHeathensStore.filter.ProductFilter;
import com.example.TheHeathensStore.entity.League;
import com.example.TheHeathensStore.entity.Product;
import com.example.TheHeathensStore.entity.Season;
import com.example.TheHeathensStore.entity.Team;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class ProductSpecification {
    public static Specification<Product> filterProduct(ProductFilter productFilter) {
        String keyword = productFilter.getKeyword();
        String teamName = productFilter.getTeamName();
        String leagueName = productFilter.getLeagueName();
        String seasonName = productFilter.getSeasonName();
        String jerseyType = productFilter.getJerseyType();
        String normalizedKeyword = StringUtils.hasText(keyword)
                ? keyword.trim()
                         .toLowerCase(Locale.ROOT)
                : null;
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            predicates.add(cb.isTrue(root.get("isActive")));
            if (normalizedKeyword != null) {
                String keywordPattern = "%" + normalizedKeyword + "%";
                Join<Product, Team> keywordTeamJoin = root.join("team", JoinType.LEFT);
                predicates.add(cb.or(
                        cb.like(cb.lower(root.get("name")), keywordPattern),
                        cb.like(cb.lower(root.get("description")), keywordPattern),
                        cb.like(cb.lower(keywordTeamJoin.get("name")), keywordPattern)
                ));
            }
            if (StringUtils.hasText(teamName)) {
                Join<Product, Team> teamJoin = root.join("team", JoinType.INNER);
                predicates.add(cb.like(cb.lower(teamJoin.get("name")), "%" + teamName.toLowerCase() + "%"));
            } else if (StringUtils.hasText(leagueName)) {
                Join<Product, Team> teamJoin = root.join("team", JoinType.INNER);
                Join<Team, League> leagueJoin = teamJoin.join("league", JoinType.INNER);
                predicates.add(cb.like(cb.lower(leagueJoin.get("name")), "%" + leagueName.toLowerCase() + "%"));
            }
            if (StringUtils.hasText(seasonName)) {
                Join<Product, Season> seasonJoin = root.join("season", JoinType.INNER);
                predicates.add(cb.like(cb.lower(seasonJoin.get("name")), "%" + seasonName.toLowerCase() + "%"));
            }
            if (StringUtils.hasText(jerseyType)) {
                predicates.add(cb.like(root.get("jerseyType"), "%" + jerseyType.toLowerCase() + "%"));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
