package com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.query.BaseQuery;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PageSummaryQuery extends BaseQuery {
    private Integer page;
    private Integer size;
    private String userId;
}
