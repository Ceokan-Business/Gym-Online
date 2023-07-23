import Link from "next/link"

const ReviewDropDown = () => {
  return (
    <section className = 'absolute top-16 bg-light-orange'>
        <div className = 'flex flex-col'>   
            <Link href = '/reviews'> Vezi recenzii </Link>
            <Link href = '/create-review'> Creeaza recenzie </Link>
        </div>
    </section>
  )
}

export default ReviewDropDown