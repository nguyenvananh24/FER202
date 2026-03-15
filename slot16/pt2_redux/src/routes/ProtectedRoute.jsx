// ProtectedRoute.jsx kết hợp useContext để truy cập trạng thái xác thực từ AuthContext và điều kiện hóa việc hiển thị nội dung dựa trên trạng thái đăng nhập của người dùng. Nếu người dùng chưa đăng nhập, nó sẽ hiển thị một thông báo yêu cầu đăng nhập.
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

//kiểm tra xem người dùng đã đăng nhập chưa, nếu chưa chuyển hướng đến trang đăng nhập
function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }
    return children;
}

export default ProtectedRoute;
