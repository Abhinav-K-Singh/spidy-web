const STORAGE_KEY = "spidySidebarV3";

const DEFAULT_DATA = {
    user: [
        {
            id: crypto.randomUUID(),
            type: "category",
            icon: "💻",
            name: "Coding",
            children: [
                {
                    id: crypto.randomUUID(),
                    type: "link",
                    icon: "🌐",
                    name: "GitHub",
                    url: "https://github.com"
                },
                {
                    id: crypto.randomUUID(),
                    type: "link",
                    icon: "🧩",
                    name: "LeetCode",
                    url: "https://leetcode.com"
                }
            ]
        },
        {
            id: crypto.randomUUID(),
            type: "category",
            icon: "🌍",
            name: "Social",
            children: []
        }
    ]
};

export function loadSidebar() {

    const data =
    localStorage.getItem(
        STORAGE_KEY
    );

    if (!data) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(DEFAULT_DATA)
        );

        return DEFAULT_DATA;
    }

    return JSON.parse(data);
}

export function saveSidebar(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );

}