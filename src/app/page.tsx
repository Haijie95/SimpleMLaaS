import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  
  return (
    <>
      <div className="w-screen min-h-screen bg-gradient-to-b from-gray-700 via-gray-900 to-black">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center">
              <h1
                className="mr-3 text-5xl font-semibold"
                style={{ color: "white" }}
              >
                Welcome to MLaaS!
              </h1>
            </div>

            <div className="max-w-xl mt-2 text-lg text-slate-600">
              <Link 
                href={{pathname: "/prediction"}}>
                <Button className="bg-gradient-to-r from-rose-100 to-teal-100" style={{ color: "black" }} type="button">
                  Go to budget prediction!
                </Button>
              </Link>
            </div>

            <p
              className="max-w-xl mt-2 text-lg text-slate-600"
              style={{ color: "white" }}
            >
              Join me in exploring the world of MLaaS! And explore the different
              ways to deploy Machine Learning Models into endpoints!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
