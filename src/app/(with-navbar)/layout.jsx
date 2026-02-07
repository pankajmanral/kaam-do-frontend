import Navbar from "@/components/Navbar";

export default function WithNavbarLayout({ children }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}