import Image, { type StaticImageData } from "next/image";
import indianaStateUniversity from "./assets/indiana-state-university.jpg";
import laTrobeUniversity from "./assets/la-trobe-university.png";
import lincolnUniversity from "./assets/lincoln-university.jpg";
import macquarieUniversity from "./assets/macquarie-university.jpg";
import masseyUniversity from "./assets/massey-university.png";
import medicalUniversityOfSouthCarolina from "./assets/medical-university-of-south-carolina.png";
import monashUniversity from "./assets/monash-university.png";
import munichBusinessSchool from "./assets/munich-business-school.png";
import queenMaryUniversityOfLondon from "./assets/queen-mary-university-of-london.jpg";
import queenslandUniversity from "./assets/queensland-university.png";
import sheridanCollege from "./assets/sheridan-college.png";
import southeastMissouriStateUniversity from "./assets/southeast-missouri-state-university.jpg";
import thompsonRiverUniversity from "./assets/thompson-river-university.png";
import universityCollegeDublin from "./assets/university-college-dublin.jpg";
import universityOfAdelaide from "./assets/university-of-adelaide.png";
import universityOfAlberta from "./assets/university-of-alberta.png";
import universityOfAuckland from "./assets/university-of-auckland.png";
import universityOfCanterbury from "./assets/university-of-canterbury.jpg";
import universityOfCincinnati from "./assets/university-of-cincinnati.png";
import universityOfOtago from "./assets/university-of-otago.png";
import universityOfWaikato from "./assets/university-of-waikato.png";
import universityOfWashington from "./assets/university-of-washington.png";
import universityOfWindsor from "./assets/university-of-windsor.png";
import victoriaUniversityWellington from "./assets/victoria-university-wellington.png";

const partners: { name: string; logo: StaticImageData }[] = [
    { name: "Sheridan College", logo: sheridanCollege },
    { name: "The University of Queensland", logo: queenslandUniversity },
    { name: "Queen Mary University of London", logo: queenMaryUniversityOfLondon },
    { name: "Munich Business School", logo: munichBusinessSchool },
    { name: "Monash University", logo: monashUniversity },
    { name: "Victoria University of Wellington", logo: victoriaUniversityWellington },
    { name: "University of Windsor", logo: universityOfWindsor },
    { name: "University of Washington", logo: universityOfWashington },
    { name: "University of Otago", logo: universityOfOtago },
    { name: "University College Dublin", logo: universityCollegeDublin },
    { name: "The University of Adelaide", logo: universityOfAdelaide },
    { name: "The University of Waikato", logo: universityOfWaikato },
    { name: "University of Cincinnati", logo: universityOfCincinnati },
    { name: "Macquarie University", logo: macquarieUniversity },
    { name: "Indiana State University", logo: indianaStateUniversity },
    { name: "La Trobe University", logo: laTrobeUniversity },
    { name: "Lincoln University", logo: lincolnUniversity },
    { name: "Massey University", logo: masseyUniversity },
    { name: "Medical University of South Carolina", logo: medicalUniversityOfSouthCarolina },
    { name: "Southeast Missouri State University", logo: southeastMissouriStateUniversity },
    { name: "Thompson Rivers University", logo: thompsonRiverUniversity },
    { name: "University of Alberta", logo: universityOfAlberta },
    { name: "University of Auckland", logo: universityOfAuckland },
    { name: "University of Canterbury", logo: universityOfCanterbury },
];

function PartnerCards({ ariaHidden = false }: { ariaHidden?: boolean }) {
    return (
        <ul aria-hidden={ariaHidden || undefined} className="flex items-stretch gap-2 pr-2">
            {partners.map((partner) => (
                <li
                    key={partner.name}
                    className="flex h-10 w-[calc(25vw-0.625rem)] shrink-0 items-center justify-center overflow-hidden rounded-2 bg-secondary sm:h-16 sm:w-40"
                >
                    <Image
                        src={partner.logo}
                        alt={ariaHidden ? "" : partner.name}
                        title={partner.name}
                        className="h-full w-full object-contain"
                    />
                </li>
            ))}
        </ul>
    );
}

export function Partners() {
    return (
        <section aria-label="Our partner universities" className="border-b border-rule py-section-y-tight">
            <div className="overflow-hidden">
                <div className="flex w-max animate-marquee [animation-duration:80s]">
                    <PartnerCards />
                    <PartnerCards ariaHidden />
                </div>
            </div>
        </section>
    );
}
