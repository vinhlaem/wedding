<template>
    <section id="couple" class="profile-section reveal section-anchor">
        <div class="profile-container">
            <div class="profile-content">
                <div class="profile-images">
                    <div class="profile-image-wife-container "> <img :src="wifeImage" alt="Wife"
                            class="profile-image wife-image" /></div>
                    <div class="profile-image-husband-container"> <img :src="husbandImage" alt="Husband"
                            class="profile-image husband-image" /></div>
                    <img :src="heartIcon" alt="Heart" class="heart-icon" />
                    <div class="info-husband">
                        <div class="info-container">
                            <h3 class="name">{{ profile.husband.name }}</h3>
                            <p class="info-text">{{ profile.husband.text }}</p>
                        </div>
                    </div>
                    <div class="info-wife">
                        <div class="info-container">
                            <h3 class="name">{{ profile.wife.name }}</h3>
                            <p class="info-text">{{ profile.wife.text }}</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import wifeImage from '@/assets/images/profile/wife.png'
import husbandImage from '@/assets/images/profile/husband.png'
import heartIcon from '@/assets/images/profile/heart.svg'
import profile from '@/data/profile.json'
</script>

<style scoped>
.profile-section {
    background: #fff;
    padding: 80px 0px;
    overflow: hidden;
}

.profile-container {
    max-width: 1200px;
    margin: 0 auto;
    text-align: center;
}

.profile-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 60px;
}

.profile-images {
    position: relative;
    max-width: 100%;
    max-height: 800px;
    height: 700px;
    width: 100%;
}

.profile-image-wife-container {
    position: absolute;
    top: 40px;
    left: 0;
    transform: rotate(-15deg);
    z-index: 2;
    padding: 20px;
    background: #fff;
    border-radius: 100%;
    border: 2px solid #d4a5a5;
    width: 100%;
    height: 100%;
    max-width: 450px;
    max-height: 450px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 100%;
}


.profile-image-husband-container {
    position: absolute;
    bottom: 40px;
    right: 0;
    transform: rotate(15deg);
    z-index: 1;
    padding: 20px;
    background: #fff;
    border-radius: 100%;
    max-width: 450px;
    max-height: 450px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    border: 2px solid #d4a5a5;
}

.heart-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    z-index: 3;
    animation: heartbeat 2s ease-in-out infinite;
}

.info-container {
    background: #fff;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 250px;
    border: 2px solid #d4a5a5;
}

.info-husband {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 30%;
    transform: translateX(30%);
    z-index: 4;
}

.info-wife {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    left: 30%;
    transform: translateX(-30%);
    z-index: 4;
}

.name {
    font-family: var(--font-dancing-script);
    font-size: 3rem;
    color: #d4a5a5;
    font-weight: 400;
}

.info-text {
    font-family: var(--font-mulish);
    font-size: 1.2rem;
    color: #333;
    font-weight: 400;
}

@keyframes heartbeat {

    0%,
    100% {
        transform: translate(-50%, -50%) scale(1);
    }

    50% {
        transform: translate(-50%, -50%) scale(1.1);
    }
}

@media (max-width: 1199px) {
    .profile-section {
        padding: 80px 16px;
    }
}

/* Tablet and below: scale images down a bit */
@media (max-width: 1024px) {
    .profile-image-wife-container,
    .profile-image-husband-container {
        max-width: 300px;
        max-height: 300px;
        padding: 10px;
    }
    .heart-icon {
        width: 70px;
        height: 70px;
    }
}

/* Mobile: remove absolute layout, stack vertically */
@media (max-width: 768px) {
    
    .profile-content {
        flex-direction: column;
        gap: 20px;
    }

    .profile-images {
        position: relative !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-height: 608px !important;
        gap: 20px;
    }

    .profile-image-wife-container {
        position: absolute !important;
        max-width: 240px;
        max-height: 240px;
        top: 0;
        left: 16px;
        transform: none !important;
        border-radius: 100%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        background: #fff;
        min-width: 120px;
        height: auto;
    }
    .profile-image-husband-container {
        position: absolute !important;
        max-width: 240px;
        max-height: 240px;
        bottom: 0;
        right: 16px;
        transform: none !important;
        border-radius: 100%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
        background: #fff;
        min-width: 120px;
        height: auto;
    }

    .heart-icon {
        position: static !important;
        margin: 25px 0;
        transform: none !important;
        width: 80px !important;
        height: 80px !important;
    }

    .info-husband {
        position: absolute !important;
        bottom: 16px;
        left: 16px;
        right: unset !important;
        top: unset !important;
        transform: none !important;
        display: flex;
        justify-content: center;
    }
    .info-wife {
        position: absolute !important;
        top: 20px;
        right: 16px;
        left: unset !important;
        bottom: unset !important;
        transform: none !important;
        display: flex;
        justify-content: center;
    }

    .info-container {
        min-width: unset;
        width: 100%;
        max-width: 310px;
        height: unset;
        padding: 12px;
        text-align: center;
    }

    .name {
        font-size: 1.5rem;
    }

    @media (max-width: 580px) {
        .profile-section {
            padding: 0px 16px 60px 16px;
        }
        .profile-images {
            position: static !important;
            max-height: none !important;
            height: auto !important;
            gap: 16px;
        }

        .profile-image-wife-container,
        .profile-image-husband-container {
            position: static !important;
            top: auto !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            transform: none !important;
            max-width: 320px !important;
            max-height: 320px !important;
            width: 70vw !important;
            height: auto !important;
            margin: 0 auto !important;
            padding: 0 !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.06) !important;
        }

        .heart-icon {
            position: static !important;
            width: 50px !important;
            height: 50px !important;
            margin: 12px 0 !important;
            transform: none !important;
        }

        .info-husband,
        .info-wife {
            position: static !important;
            transform: none !important;
            width: 100% !important;
            display: flex !important;
            justify-content: center !important;
            margin: 6px 0 !important;
        }

        .info-container {
            max-width: 400px !important;
            padding: 10px !important;
        }

        /* Order to keep wife image next to wife info, then heart, then husband */
        .profile-image-wife-container { order: 1 !important; }
        .info-wife { order: 2 !important; }
        .heart-icon { order: 3 !important; }
        .profile-image-husband-container { order: 4 !important; }
        .info-husband { order: 5 !important; }
    }
}
</style>