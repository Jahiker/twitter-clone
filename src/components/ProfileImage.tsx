import { useSession } from "next-auth/react"
import Image from "next/image"

type ProfileImageProps = {
    src?: string | null | undefined
    className?: string
}

export const ProfileImage = ({src, className = ""}: ProfileImageProps) => {
    const session = useSession()

    if(session.status !== 'authenticated') return null


  return (
    <div className={`relative h-12 w-12 overflow-hidden rounded-full ${className}`}>
        {src === null ? null : <Image src={session.data.user.image} alt="Profile Image" quality={100} width={100} height={100} />}
    </div>
  )
}
