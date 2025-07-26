package com.marckvsv.reclame_ali_backend.complaints.api.cqrs.query;

import com.marckvsv.reclame_ali_backend.sharedKernel.application.query.BaseQuery;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GetComplaintQuery extends BaseQuery {
    private UUID complaintID;
}
