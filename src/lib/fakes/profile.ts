const fakeProfile = {
    user: {
        firstname: 'Étienne',
        lastname: 'Courchesne',
    },
    overview: {
        salutations: 0,
        nickname: 'Étienne',
        shortDescription: 'I’m a 21 years old freestyle swimmer from Trois-Rivières, Quebec.',
        intro_paragraph:
            'This creative presentation of my academic and athletic journey will showcase my accomplishments to date and give you a sense of who I am as a person. I’m the person who always goes the extra mile, as this presentation will demonstrate.',
        dob: '2003-05-05',
        height: 193,
        weight: 190,
        hometown: 'Shawinigan, Quebec',
        residency: 'Trois-Rivières, Quebec',
    },
    motto: {
        motto: 'Full Send.',
        explanation:
            'As someone who tends to analyze each and every detail, this personal motto of mine reminds me that while my analytical mind is one of my greatest assets, when the time comes, I must simply DIVE IN AND GIVE IT MY ALL, no matter the odds, no matter the challenge.',
    },
    academics: {
        intro: 'While swimming is my main focus at the time, I also run a software development company, providing my clients with custom high-grade solutions. In order to deepen my knowledge and to one day be able to teach, I plan to pursue my academic career and to get a bachelor’s degree in computer sciences.',
        school: 'Université du Québec à Trois-Rivières',
        program: 'Bachelor in Computer Sciences',
        schoolType: 'University',
        schoolYear: 1,
        sats: null,
        mesure: 1, // enum -> GPA, AVG, etc...
        mark: 88.5, // defines the value of the mesure
        fields: [0, 3, 6, 9, 5], // enum -> fields of interest (health, STEM, social sciences, etc..)
    },
    
}

export default fakeProfile
