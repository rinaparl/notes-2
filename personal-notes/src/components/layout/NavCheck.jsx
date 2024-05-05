import React from "react";
import { HiCheck } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import PageAction from "./PageAction";

function NavAdd() {
  const navigate = useNavigate()

  return (
    <PageAction page="homepage">
      <button
        className="action"
        type="button"
        title="Tambah"
        onClick={() => navigate('/notes/new')}
      >
        <HiCheck />
      </button>
    </PageAction>
  )
}

export default NavAdd;