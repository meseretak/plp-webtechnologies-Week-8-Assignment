.social-sidebar {
  position: fixed;
  left: 20px;
  top: 40%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 999;
}

.social-sidebar a {
  color: white;
  background: #0f766e;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  text-decoration: none;
  transition: transform 0.3s, background 0.3s;
}

.social-sidebar a:hover {
  transform: translateX(6px);
  background: #0ea5a4;
}
