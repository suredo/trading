import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { useAuth } from "~/contexts/auth";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { user, isLoading, error } = useAuth();
  console.log(user);
  return <Welcome />;
}
