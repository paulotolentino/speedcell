import styled from "styled-components";

export const PrincipalDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 30px; */
`;

export const CompanyDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  height: 100px;
  width: 100%;
  align-items: center;
`;

export const CompanyLogoAndName = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

export const CompanyContact = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const Logo = styled.img`
  zoom: 0.05;
`;

export const CompanyInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const CompanyInfosContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 18px;
`;

export const CompanyName = styled.span`
  font-family: Roboto-Medium, sans-serif;
`;

export const BoldSpan = styled.span`
  font-weight: bold;
`;

export const NotBoldSpan = styled.span`
  font-weight: normal;
`;

export const ServiceOrderNumberAndDate = styled.div`
  width: 100%;
  background-color: #ddd;
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const NumberAndDate = styled.span`
  flex: 1;
  font-weight: bold;
  font-size: 17px;
  display: flex;
  justify-content: flex-end;
  padding: 4px;
`;

export const ClientDataHeader = styled.div`
  width: 100%;
  background-color: #ddd;
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`;

export const ClientData = styled.span`
  font-weight: bold;
  font-size: 15px;
  padding: 4px;
`;

export const ClientDataInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
`;

export const ClientDataRow = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ClientDataCellTitle = styled.div`
  border: 1px solid #ddd;
  padding: 5px;
  width: 80px;
  word-wrap: normal;
`;

export const ClientDataCellContent = styled.div`
  border: 1px solid #ddd;
  padding: 5px;
  width: 260px;
  word-wrap: normal;
`;

export const SpanBold = styled.span`
  font-weight: bold;
  font-size: 14px;
`;

export const LabelInputGroup = styled.div`
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const InputOS = styled.input`
  border: none;
  border-bottom: 1px solid #ddd;
  outline: none;
`;

export const SignClient = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0;
  margin: 0;
`;

export const PrintableArea = styled.div`
  padding: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

export const TextAreaOS = styled.textarea`
  font-family: Roboto-Medium, sans-serif;
`;
