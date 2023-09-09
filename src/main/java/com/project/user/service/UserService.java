package com.project.user.service;

import com.project.user.dto.UserDto;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    //한명의 회원의 정보를 업데이트
    String updateUser(UserDto userDt) throws IllegalAccessException;

    //한명의 회원탈퇴 Update Status
    void deactivateUser(int userNum);

    //회원의 비밀번호 변경
    String  updatePassword(UserDto userDto);

    //회원의 프로필사진과 한 줄 소개 조회
    UserDto getUserProfileAndIntroduction(String userEmail);

    //회원 목록 조회
    List<UserDto> getAllUsers();

    //한명의 유저소생 Update Status
    void userActive(int userNum);
}
