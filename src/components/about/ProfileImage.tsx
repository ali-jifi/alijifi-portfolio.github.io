'use client';

import Image from 'next/image';
import { getAssetPath } from '@/utils/paths';

export const ProfileImage = () => {
    return (
        <div className="relative w-48 h-48 transition-transform duration-300 hover:scale-105">
            <Image
                src={getAssetPath('/profilepicture.jpg')}
                alt="Profile Image"
                width={192}
                height={192}
                className="rounded-full shadow-lg"
                priority
            />
        </div>
    );
};