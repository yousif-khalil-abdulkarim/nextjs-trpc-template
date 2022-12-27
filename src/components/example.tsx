import { trpc } from "@/client/trpc";

export function Example() {
    const helloWorld = trpc.helloWorld.default.useQuery();
    return <p> {helloWorld.data} </p>;
}
