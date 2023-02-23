import React from 'react';
import { Report } from '../pages'

const ReportScreen = ({ navigation, route }) => {

  return (
    <Report goToBack={() => navigation.goBack()}/>
  )
}
export default ReportScreen;