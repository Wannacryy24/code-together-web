import React from 'react'
import Homepage2 from '../Home/Homepage2'
import FeatureBarWithIcons from '../../NEWTHEME/Features/FeaturesBar'
import VideoSection from '../../NEWTHEME/VideoSection/VideoSection'
import FeatureSectionWithVideo from '../../NEWTHEME/FeatureSectionWithVideo/FeatureSectionWithVideo'
import CodeLanguages from '../../components/CodeLanguages/CodeLanguages'
import Footer from '../Footer/Footer'

export default function LandingPage() {
    return (
        <>
            <Homepage2 />
            <FeatureBarWithIcons />
            <VideoSection />
            <FeatureSectionWithVideo />
            <CodeLanguages />
        </>
    )
}
