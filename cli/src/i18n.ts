export type Language = "en" | "ko";

export const i18n = {
  en: {
    selectLanguage: "Please select your language:",
    setupType: "Which setup would you like to run?",
    setupManual: "Manual Configuration",
    setupKaliPreset: "Kali Linux Security VM (Preset)",
    provider: "Which VM provider would you like to use?",
    osVagrant: "Which Operating System would you like to provision?",
    osDocker: "Which Docker image would you like to use?",
    ram: "How much RAM (in MB) to allocate?",
    cpu: "How many CPU cores to allocate?",
    disk: "How much Disk Space (in GB) to allocate?",
    network: "What network type?",
    platform: "Which host platform will run this VM?",
    runProvisioning: "Do you want to run the provisioning now?",
    skipProvisioning:
      "\nSkipping provisioning. Your configuration files have been generated.",
  },
  ko: {
    selectLanguage: "언어를 선택해주세요:",
    setupType: "어떤 설정을 실행하시겠습니까?",
    setupManual: "수동 설정",
    setupKaliPreset: "칼리 리눅스 보안 VM (프리셋)",
    provider: "어떤 VM 제공자를 사용하시겠습니까?",
    osVagrant: "어떤 운영 체제를 프로비저닝하시겠습니까?",
    osDocker: "어떤 Docker 이미지를 사용하시겠습니까?",
    ram: "할당할 RAM 용량(MB)은 얼마입니까?",
    cpu: "할당할 CPU 코어 수는 몇 개입니까?",
    disk: "할당할 디스크 공간(GB)은 얼마입니까?",
    network: "어떤 네트워크 유형을 사용하시겠습니까?",
    platform: "이 VM을 실행할 호스트 플랫폼은 무엇입니까?",
    runProvisioning: "지금 프로비저닝을 실행하시겠습니까?",
    skipProvisioning: "\n프로비저닝을 건너뜁니다. 구성 파일이 생성되었습니다.",
  },
};
