import React from 'react'
import { useTranslation } from 'react-i18next'
import { NavDropdown } from 'react-bootstrap'
import { languages } from '../i18n'

const LanguageSwitcher = () => {
	const { i18n } = useTranslation()

	const changeLanguage = (language) => {
		i18n.changeLanguage(language)
	}

	return (
		<NavDropdown title={languages[i18n.language].nativeName}>
			{Object.keys(languages).map((language) => {
				return (
					<NavDropdown.Item
						active={i18n.language === language}
						key={language}
						onClick={() => changeLanguage(language)}>
						{languages[language].nativeName}
					</NavDropdown.Item>
				)
			})}
		</NavDropdown>
	)
}

export default LanguageSwitcher
