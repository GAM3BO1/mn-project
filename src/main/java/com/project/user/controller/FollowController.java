package com.project.user.controller;

import com.project.user.dto.FollowDto;
import com.project.user.service.FollowServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/follow")
@RequiredArgsConstructor
public class FollowController {

    private final FollowServiceImpl followService;

    //팔로우/언팔로우 토글
    /*
        팔로우 상태를 토글할 수 있게 설정함.
        클라이언트 측에서는 서버로부터 반환된 메세지를 사용자에게 보여줄 수 있음.
     */
    @PostMapping("/toggle")
    public ResponseEntity<String> toggleFollow(@RequestBody FollowDto followDto) {
        String message = followService.toggleFollow(followDto);
        return ResponseEntity.ok(message);
    }
    // 특정 회원의 팔로워 갯수 조회
    @GetMapping("/followers/count/{userEmail}")
    public int countFollowers(@PathVariable String userEmail) {
        return followService.countFollowers(userEmail);
    }

    // 특정 회원의 팔로잉 갯수 조회
    @GetMapping("/followings/count/{userEmail}")
    public int countFollowings(@PathVariable String userEmail) {
        return followService.countFollowings(userEmail);
    }

}
