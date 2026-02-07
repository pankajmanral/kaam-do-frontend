export default function PrimaryButton({ buttonLabel, buttonType }){
    return(
        <>
            <button type={buttonType} className={"border rounded-xl px-3 py-1 cursor-pointer hover:bg-white hover:text-black transition-all duration-500"}>
                {buttonLabel}
            </button>
        </>
    )
}