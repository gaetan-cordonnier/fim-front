module.exports = {
  rules: {
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
    "header-max-length": [2, "always", 100],
    "subject-case": [
      2,
      "always",
      [
        "lower-case",
        "sentence-case",
        "start-case",
        "pascal-case",
        "upper-case",
        "camel-case",
        "kebab-case",
        "snake-case",
      ],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "revert",
      ],
    ],
  },
  prompt: {
    messages: {
      skip: "appuyer sur [Enter] pour passer",
      max: "max %d caractères",
      min: "min %d caractères",
      emptyWarning: "champ obligatoire",
      upperLimitWarning: "au-dessus de la limite",
      lowerLimitWarning: "sous la limite",
    },
    questions: {
      type: {
        description:
          "Choisissez le type de modification que concerne votre commit :",
        enum: {
          feat: {
            description: "Ajout/mise à jour de fonctionnalité",
            title: "Features",
            emoji: "✨",
          },
          fix: {
            description: "Correction de bug",
            title: "Bug Fixes",
            emoji: "🐛",
          },
          docs: {
            description: "Ajout/modif. de documentation",
            title: "Documentation",
            emoji: "📚",
          },
          style: {
            description:
              "Modifs de style et de mise en forme du code (espacements, virgules, etc.)",
            title: "Styles",
            emoji: "💎",
          },
          refactor: {
            description:
              "Modif. des sources n’étant ni un correctif, ni un ajout de fonctionnalité",
            title: "Code Refactoring",
            emoji: "📦",
          },
          perf: {
            description: "Amélioration de la performance",
            title: "Performance Improvements",
            emoji: "🚀",
          },
          test: {
            description: "Ajout ou correction de tests",
            title: "Tests",
            emoji: "🚨",
          },
          build: {
            description:
              'Modif. affectant le "build" ou les dépendances externes (exemples de contextes :  webpack, package.json, npm)',
            title: "Builds",
            emoji: "🛠",
          },
          ci: {
            description:
              "Modif. de la configuration ou des scripts liés à la CI (GitHub Actions)",
            title: "Continuous Integrations",
            emoji: "⚙️",
          },
          revert: {
            description: "Annuler (revert) un commit précédent",
            title: "Revert",
            emoji: "🗑",
          },
        },
      },
      scope: {
        description:
          "Quel (composant, page, nom de fichier...) est concerné par les modifications  ?",
      },
      subject: {
        description:
          "Écrivez une description concise des modifications (en anglais)",
      },
      body: {
        description:
          "Renseignez une description plus détaillée des modifications (en anglais)",
      },
      isIssueAffected: {
        description: "Existe-t-il un ticket pour cette modification ?",
      },
      issues: {
        description: 'Ajoutez une référence de ticket ("exemple: CS-123")',
      },
    },
  },
};
