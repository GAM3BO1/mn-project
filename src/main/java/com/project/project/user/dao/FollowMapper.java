package com.project.project.user.dao;

import com.project.project.user.dto.FollowDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FollowMapper {

    //Follow add
    void insertFollow(FollowDto followDto);

    //Select Follower
    List<FollowDto> findFollowers(String userEmail);

    //Select Following
    List<FollowDto> findFollowings(String userEmail);

    //Delete Follow
    void deleteFollow(FollowDto followDto);
}
