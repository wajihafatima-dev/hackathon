import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
  <div>
    <Link href={"/api/tasks"} content="contained">CheckTask</Link>
    <br/>
    <Link href={"/api/users"} content="contained">CheckUsers</Link>
  </div>
  );
}
