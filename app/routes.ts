import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/register", "routes/register.tsx"),
    route("/login", "routes/login.tsx"),
    route("/wallet", "routes/wallet.tsx"),
    route("/profile", "routes/profile.tsx"),
    route("/deposit", "routes/deposit.tsx"),
    route("/dashboard", "routes/dashboard.tsx")
] satisfies RouteConfig;
