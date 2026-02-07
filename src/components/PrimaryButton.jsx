export default function PrimaryButton({ buttonLabel, buttonType }){
    return(
        <>
            <button type={buttonType} className={"border border-2 rounded-md px-3 py-1 cursor-pointer text-black font-bold hover:bg-black hover:text-white transition-all duration-500"}>
                {buttonLabel}
            </button>
        </>
    )
}