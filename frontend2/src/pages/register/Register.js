import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BsFillPersonDashFill, BsPersonVcard, BsFillPersonPlusFill } from "react-icons/bs";
import "./Register.css";
import InputMask from 'react-input-mask';

const Register = () => {
  const navigateTo = useNavigate();

  const goToEmployees = () => {
    navigateTo("/employees");
  };

  const goToCursos = () => {
    navigateTo("/cursos");
  };

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
    }
  }, [navigateTo]);

  const initialValues = {
    name: "",
    cpf: "",
    email: "",
    address: "",
    phonenumber: "",
    birthday: "",
    admissiondate: "",
    asodate: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório"),
    cpf: Yup.string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF inválido")
      .required("Campo obrigatório"),
    email: Yup.string().email("Email inválido").required("O email é obrigatório"),
    address: Yup.string().required("O endereço é obrigatório"),
    phonenumber: Yup.string()
      .matches(/^\(\d{2}\) \d{5}-\d{4}$/, "Número de telefone inválido")
      .required("O telefone é obrigatório"),
    birthday: Yup.date().max(new Date(), "A data de nascimento não pode ser futura").required("A data de nascimento é obrigatória"),
    admissiondate: Yup.date().max(new Date(), "A data de admissão não pode ser futura").required("A data de admissão é obrigatória"),
    asodate: Yup.date().max(new Date(), "A data de ASO não pode ser futura").required("A data de ASO é obrigatória"),
  });

  const onSubmit = (data) => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!accessToken) {
      navigateTo("/");
      return;
    }

    axios
      .post("http://localhost:3005/employeeinfo", data, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((response) => {
        console.log("IT WORKED");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="page">
      <div className="header">
        <h1 onClick={goToEmployees}>
          Sonda <br /> Engenharia
        </h1>
        <div className="sidebar">
          <div className="icons-sidebar">
            <BsFillPersonPlusFill />
            <BsFillPersonDashFill />
            <BsPersonVcard onClick={goToCursos} />
          </div>
        </div>
      </div>
      <div className="container">
        <h1> Cadastrar Funcionário</h1>
        <div className="createPostPage">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            <Form className="formContainer">
              <div className="left-card">
                <Field
                  id="inputCreatePost"
                  name="name"
                  placeholder="Nome completo"
                />
                <ErrorMessage name="name" component="span" />

                <Field
                  id="inputCreatePost"
                  name="cpf"
                  placeholder="CPF"
                  as={InputMask}
                  mask="999.999.999-99"
                />
                <ErrorMessage name="cpf" component="span" />

                <Field
                  id="inputCreatePost"
                  name="email"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="span" />

                <Field
                  id="inputCreatePost"
                  name="address"
                  placeholder="Endereço"
                />
                <ErrorMessage name="address" component="span" />
              </div>

              <div className="right-card">
                <Field
                  id="inputCreatePost"
                  name="phonenumber"
                  placeholder="Telefone"
                  as={InputMask}
                  mask="(99) 99999-9999"
                />
                <ErrorMessage name="phonenumber" component="span" />

                <Field
                  id="inputCreatePost"
                  name="birthday"
                  placeholder="Data de nascimento"
                  as={InputMask}
                  mask="99/99/9999"
                />
                <ErrorMessage name="birthday" component="span" />

                <Field
                  id="inputCreatePost"
                  name="admissiondate"
                  placeholder="Data de admissão"
                  as={InputMask}
                  mask="99/99/9999"
                />
                <ErrorMessage name="admissiondate" component="span" />

                <Field
                  id="inputCreatePost"
                  name="asodate"
                  placeholder="Data de ASO"
                  as={InputMask}
                  mask="99/99/9999"
                />
                <ErrorMessage name="asodate" component="span" />
              </div>
              <div className="baixo">
                <button type="submit" className="cadastrar">
                  Cadastrar
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Register;
