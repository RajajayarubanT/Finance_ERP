import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'


const PROCESS = () => {
    const history = useHistory();
    // master Detail
    let [customerData, setCustomerData] = useState([]);
    let [itemData, setItemData] = useState([]);
    let [processData, setProcessData] = useState([]);
    let [comboData, setComboData] = useState([]);
    let [componentData, setComponentData] = useState([]);
    let [sizeData, setSizeData] = useState([]);

    useEffect(() => {
        fetch("/masterDetails")
            .then((res) => res.json())
            .then((result) => {
                setCustomerData(result.customer);
                setItemData(result.item);
                setProcessData(result.process);
                setComboData(result.combo);
                setComponentData(result.component);
                setSizeData(result.size);
            });
    }, []);

    // Costing Details
    const [CostDocNo, setCostDocNo] = useState("");
    const [DocVersion, setDocVersion] = useState("");
    const [StyleCode, setStyleCode] = useState("");
    const [BuyerName, setBuyerName] = useState("");
    const [Profit, setProfit] = useState("");
    const [CodeDocDate, setCodeDocDate] = useState("");
    const [Combo, setCombo] = useState("");
    const [Size, setSize] = useState("");
    const [GrocessPcWeight, setGrocessPcWeight] = useState("");
    const [NetPcWeight, setNetPcWeight] = useState("");

    // Currency Details
    const [PaymentDays, setPaymentDays] = useState("");
    const [CurrencyCode, setCurrencyCode] = useState("");
    const [CurrencyRate, setCurrencyRate] = useState("");
    const [QuotedPrice, setQuotedPrice] = useState("");
    const [TargetPrice, setTargetPrice] = useState("");
    const [ActualPrice, setActualPrice] = useState("");

    // Rejection
    const [Rejection, setRejection] = useState("");

    // Status Details
    const [ApprovedBy, setApprovedBy] = useState("");
    const [ApprovedFlag, setApprovedFlag] = useState("");
    const [ApprovedDate, setApprovedDate] = useState("");

    // Costing Summary
    const [RawMaterialCost, setRawMaterialCost] = useState("");
    const [KnittingCost, setKnittingCost] = useState("");
    const [ProcessCost, setProcessCost] = useState("");
    const [TrimsCost, setTrimsCost] = useState("");
    const [OtherCost, setOtherCost] = useState("");





    //   KNITTING Array
    const [KnittingArray, setKnittingArray] = useState([{
        ComponentName: '',
        SMV: '',
        Rate: '',
        Amount: '',
    }]);

    const addItemKnittingArray = (index, event) => {
        const values = [...KnittingArray];
        values[index][event.target.name] = event.target.value;
        setKnittingArray(values);
    };
    const updateKnittingArray = (index, item) => {
        const values = [...KnittingArray];
        let arrayItem = values[index];
        arrayItem.ComponentName = item.ComponentName;
        arrayItem.SMV = item.SMV;
        arrayItem.Rate = item.Rate;
        arrayItem.Amount = item.Amount;
        setKnittingArray(values);
    };

    const addKnittingTabeItem = () => {
        setKnittingArray([...KnittingArray, {
            ComponentName: '',
            SMV: '',
            Rate: '',
            Amount: '',
        }]);
    };

    const deleteKnittingTabeItem = (index) => {
        const values = [...KnittingArray];
        values.splice(index, 1);
        setKnittingArray(values);
    };
    //   RAW Material Array
    const [RawMaterial, setRawMaterial] = useState([{
        YarnName: '',
        YarnColor: '',
        RequiredQty: '',
        Rate: '',
        Amount: ''
    }]);

    const addItemRawMaterial = (index, event) => {
        const values = [...RawMaterial];
        values[index][event.target.name] = event.target.value;
        setRawMaterial(values);
    };
    const updateRawMaterial = (index, item) => {
        const values = [...RawMaterial];
        let arrayItem = values[index];
        arrayItem.YarnName = item.YarnName;
        arrayItem.YarnColor = item.YarnColor;
        arrayItem.RequiredQty = item.RequiredQty;
        arrayItem.Rate = item.Rate;
        arrayItem.Amount = item.Amount;
        setRawMaterial(values);
    };

    const addRawMaterialTabeItem = () => {
        setRawMaterial([...RawMaterial, {
            YarnName: '',
            YarnColor: '',
            RequiredQty: '',
            Rate: '',
            Amount: ''
        }]);
    };

    const deleteRawMaterialTabeItem = (index) => {
        const values = [...RawMaterial];
        values.splice(index, 1);
        setRawMaterial(values);
    };
    //   Process Array
    const [Process, setProcess] = useState([{
        ProcessName: '',
        SMV: '',
        Rate: '',
        Amount: '',
        OutSourceFlag: '',
    }]);

    const addItemProcess = (index, event) => {
        const values = [...Process];
        values[index][event.target.name] = event.target.value;
        setProcess(values);
    };
    const updateProcess = (index, item) => {
        const values = [...Process];
        let arrayItem = values[index];
        arrayItem.ProcessName = item.ProcessName;
        arrayItem.SMV = item.SMV;
        arrayItem.Rate = item.Rate;
        arrayItem.Amount = item.Amount;
        arrayItem.OutSourceFlag = item.OutSourceFlag;
        setProcess(values);
    };

    const addProcessTabeItem = () => {
        setProcess([...Process, {
            ProcessName: '',
            SMV: '',
            Rate: '',
            Amount: '',
            OutSourceFlag: '',
        }]);
    };

    const deleteProcessTabeItem = (index) => {
        const values = [...Process];
        values.splice(index, 1);
        setProcess(values);
    };
    //   Process Array
    const [TrimsArray, setTrimsArray] = useState([{
        ItemName: '',
        Quality: '',
        Price: '',
        Amount: '',

    }]);

    const addItemTrimsArray = (index, event) => {
        const values = [...TrimsArray];
        values[index][event.target.name] = event.target.value;
        setTrimsArray(values);
    };
    const updateTrimsArray = (index, item) => {
        const values = [...TrimsArray];
        let arrayItem = values[index];
        arrayItem.ItemName = item.ItemName;
        arrayItem.Quality = item.Quality;
        arrayItem.Price = item.Price;
        arrayItem.Amount = item.Amount;
        setTrimsArray(values);
    };

    const addTrimsArrayTabeItem = () => {
        setTrimsArray([...TrimsArray, {
            ItemName: '',
            Quality: '',
            Price: '',
            Amount: '',
        }]);
    };

    const deleteTrimsArrayTabeItem = (index) => {
        const values = [...TrimsArray];
        values.splice(index, 1);
        setTrimsArray(values);
    };
    //   Others Array
    const [OthersArray, setOthersArray] = useState([{
        OtherItemName: '',
        Price: '',
        Percentage: '',
        Amount: '',

    }]);

    const addItemOthersArray = (index, event) => {
        const values = [...OthersArray];
        values[index][event.target.name] = event.target.value;
        setOthersArray(values);
    };
    const updateOthersArray = (index, item) => {
        const values = [...OthersArray];
        let arrayItem = values[index];
        arrayItem.OtherItemName = item.OtherItemName;
        arrayItem.Percentage = item.Percentage;
        arrayItem.Price = item.Price;
        arrayItem.Amount = item.Amount;
        setOthersArray(values);
    };

    const addOthersArrayTabeItem = () => {
        setOthersArray([...OthersArray, {
            OtherItemName: '',
            Price: '',
            Percentage: '',
            Amount: '',
        }]);
    };

    const deleteOthersArrayTabeItem = (index) => {
        const values = [...OthersArray];
        values.splice(index, 1);
        setOthersArray(values);
    };



    const UploadStyleLib = () => {
        console.log({
            CostDocNo,
            DocVersion,
            StyleCode,
            BuyerName,
            Profit,
            CodeDocDate,
            Combo,
            Size,
            GrocessPcWeight,
            NetPcWeight,
            PaymentDays,
            CurrencyCode,
            CurrencyRate,
            QuotedPrice,
            TargetPrice,
            ActualPrice,
            Rejection,
            ApprovedBy,
            ApprovedFlag,
            ApprovedDate,
            RawMaterialCost,
            KnittingCost,
            ProcessCost,
            TrimsCost,
            OtherCost,
            // ARRAYS
            KnittingArray,
            RawMaterial,
            Process,
            OthersArray
        })
        fetch("/styleCostingLibrary", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                CostDocNo,
                DocVersion,
                StyleCode,
                BuyerName,
                Profit,
                CodeDocDate,
                Combo,
                Size,
                GrocessPcWeight,
                NetPcWeight,
                PaymentDays,
                CurrencyCode,
                CurrencyRate,
                QuotedPrice,
                TargetPrice,
                ActualPrice,
                Rejection,
                ApprovedBy,
                ApprovedFlag,
                ApprovedDate,
                RawMaterialCost,
                KnittingCost,
                ProcessCost,
                TrimsCost,
                OtherCost,
                // ARRAYS
                KnittingArray,
                RawMaterial,
                Process,
                OthersArray
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log("StyleCosting Library Upload Error");
                } else {
                    history.push("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="master-main-container">

            <div  >
                <div id="msform" >
                    <fieldset >
                        <div className="row">
                            <div className="col-sm-4">
                                <h3 class="fs-title">Costing Details</h3>
                                <div className="container" style={{ marginTop: '30px' }}>
                                    <input type="text"
                                        placeholder="Cost Doc No."
                                        value={CostDocNo}
                                        onChange={(e) => setCostDocNo(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Doc Version"
                                        value={DocVersion}
                                        onChange={(e) => setDocVersion(e.target.value)}


                                    />
                                    <input type="text"
                                        placeholder="Style Code"
                                        value={StyleCode}
                                        onChange={(e) => setStyleCode(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Buyer Name"
                                        value={BuyerName}
                                        onChange={(e) => setBuyerName(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Profit %"
                                        value={Profit}
                                        onChange={(e) => setProfit(e.target.value)}

                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <h3 class="fs-title">Costing Details -2</h3>
                                <div className="container" style={{ marginTop: '30px' }}>
                                    <input type="text"
                                        placeholder="Code Doc Date"
                                        value={CodeDocDate}
                                        onChange={(e) => setCodeDocDate(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="combo"
                                        value={Combo}
                                        onChange={(e) => setCombo(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="size"
                                        value={Size}
                                        onChange={(e) => setSize(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Gross Piece Weight"
                                        value={GrocessPcWeight}
                                        onChange={(e) => setGrocessPcWeight(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Net Piece Weight"
                                        value={NetPcWeight}
                                        onChange={(e) => setNetPcWeight(e.target.value)}

                                    />
                                </div>

                            </div>
                            <div className="col-sm-4">
                                <h3 class="fs-title">Currency Details</h3>
                                <div className="container" style={{ marginTop: '30px' }}>
                                    <input type="text"
                                        placeholder="payment Days"
                                        value={PaymentDays}
                                        onChange={(e) => setPaymentDays(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Currency Code"
                                        value={CurrencyCode}
                                        onChange={(e) => setCurrencyCode(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Currency Rate"
                                        value={CurrencyRate}
                                        onChange={(e) => setCurrencyRate(e.target.value)}


                                    />
                                    <input type="text"
                                        placeholder="Quoted Price"
                                        value={QuotedPrice}
                                        onChange={(e) => setQuotedPrice(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Target Price"
                                        value={TargetPrice}
                                        onChange={(e) => setTargetPrice(e.target.value)}

                                    />
                                    <input type="text"
                                        placeholder="Actual Price"
                                        value={ActualPrice}
                                        onChange={(e) => setActualPrice(e.target.value)}

                                    />

                                </div>
                            </div >
                        </div>


                        <div >
                            <div>
                                <h3 class="fs-title">Raw Material <span className="itemToList-btn" onClick={() => addRawMaterialTabeItem()}>ADD</span></h3>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Yarn Name</th>
                                            <th>Yarn Color</th>
                                            <th>Required Qty</th>
                                            <th>Rate</th>
                                            <th>Amount</th>
                                            <th>DELETE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {RawMaterial.map((RawMaterial, index) => {
                                            return (
                                                <tr>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Yarn Name"
                                                                name="YarnName"
                                                                value={RawMaterial.YarnName}
                                                                onChange={(event) => addItemRawMaterial(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Yarn Color"
                                                                name="YarnColor"
                                                                value={RawMaterial.YarnColor}
                                                                onChange={(event) => addItemRawMaterial(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Quality"
                                                                name="RequiredQty"
                                                                value={RawMaterial.RequiredQty}
                                                                onChange={(event) => addItemRawMaterial(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Rate"
                                                                name="Rate"
                                                                value={RawMaterial.Rate}
                                                                onChange={(event) => addItemRawMaterial(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Amount"
                                                                name="Amount"
                                                                value={RawMaterial.Amount}
                                                                onChange={(event) => addItemRawMaterial(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">
                                                            <span className="itemToList-btn" onClick={() => deleteRawMaterialTabeItem(index)}>DELETE</span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )

                                        })}


                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3 class="fs-title">Knitting <span className="itemToList-btn" onClick={() => addKnittingTabeItem()}>ADD</span></h3>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Component Name</th>
                                            <th>SMV</th>
                                            <th>Rate/Min</th>
                                            <th>Amount</th>
                                            <th>DELETE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {KnittingArray.map((KnittingArray, index) => {
                                            return (
                                                <tr>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Component Name"
                                                                name="ComponentName"
                                                                value={KnittingArray.ComponentName}
                                                                onChange={(event) => addItemKnittingArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>

                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter SMV"
                                                                name="SMV"
                                                                value={KnittingArray.SMV}
                                                                onChange={(event) => addItemKnittingArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Rate"
                                                                name="Rate"
                                                                value={KnittingArray.Rate}
                                                                onChange={(event) => addItemKnittingArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Amount"
                                                                name="Amount"
                                                                value={KnittingArray.Amount}
                                                                onChange={(event) => addItemKnittingArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">
                                                            <span className="itemToList-btn" onClick={() => deleteKnittingTabeItem(index)}>DELETE</span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )

                                        })}


                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3 class="fs-title">Process <span className="itemToList-btn" onClick={() => addProcessTabeItem()}>ADD</span></h3>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Process Name</th>
                                            <th>SMV</th>
                                            <th>Rate/Piece</th>
                                            <th>Amount</th>
                                            <th>Out Source Flag</th>
                                            <th>DELETE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Process.map((processArray, index) => {
                                            return (
                                                <tr>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Process Name"
                                                                name="ProcessName"
                                                                value={processArray.ProcessName}
                                                                onChange={(event) => addItemProcess(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter SMV"
                                                                name="SMV"
                                                                value={processArray.SMV}
                                                                onChange={(event) => addItemProcess(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Rate"
                                                                name="Rate"
                                                                value={processArray.Rate}
                                                                onChange={(event) => addItemProcess(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Amount"
                                                                name="Amount"
                                                                value={processArray.Amount}
                                                                onChange={(event) => addItemProcess(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                style={{ width: '20px', height: '20px' }}
                                                                type="text"
                                                                placeholder="Enter "
                                                                name="SizeGrading"
                                                                value={processArray.SizeGrading}
                                                                onChange={(event) => addItemProcess(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">
                                                            <span className="itemToList-btn" onClick={() => deleteProcessTabeItem(index)}>DELETE</span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )

                                        })}


                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3 class="fs-title">Trims <span className="itemToList-btn" onClick={() => addTrimsArrayTabeItem()}>ADD</span></h3>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ITEM Name</th>
                                            <th>Qty/Unit</th>
                                            <th>Price/Unit</th>
                                            <th>Amount</th>
                                            <th>DELETE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {TrimsArray.map((trimsArray, index) => {
                                            return (
                                                <tr>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Item Name"
                                                                name="ItemName"
                                                                value={trimsArray.ItemName}
                                                                onChange={(event) => addItemTrimsArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Quality"
                                                                name="Quality"
                                                                value={trimsArray.Quality}
                                                                onChange={(event) => addItemTrimsArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Price"
                                                                name="Price"
                                                                value={trimsArray.Price}
                                                                onChange={(event) => addItemTrimsArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Amount"
                                                                name="Amount"
                                                                value={trimsArray.Amount}
                                                                onChange={(event) => addItemTrimsArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">
                                                            <span className="itemToList-btn" onClick={() => deleteTrimsArrayTabeItem(index)}>DELETE</span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )

                                        })}


                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <h3 class="fs-title">Others <span className="itemToList-btn" onClick={() => addOthersArrayTabeItem()}>ADD</span></h3>
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Other ITEM Name</th>
                                            <th>Price/Piece</th>
                                            <th>Percentage</th>
                                            <th>Amount</th>
                                            <th>DELETE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {OthersArray.map((othersArray, index) => {
                                            return (
                                                <tr>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Item Name"
                                                                name="OtherItemName"
                                                                value={othersArray.OtherItemName}
                                                                onChange={(event) => addItemOthersArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Price"
                                                                name="Price"
                                                                value={othersArray.Price}
                                                                onChange={(event) => addItemOthersArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Percentage"
                                                                name="Percentage"
                                                                value={othersArray.Percentage}
                                                                onChange={(event) => addItemOthersArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">

                                                            <input
                                                                type="text"
                                                                className="combo-input-field"
                                                                placeholder="Enter Amount"
                                                                name="Amount"
                                                                value={othersArray.Amount}
                                                                onChange={(event) => addItemOthersArray(index, event)}
                                                            />
                                                        </div>
                                                    </td>
                                                    <td >
                                                        <div className="itemToList-item-line">
                                                            <span className="itemToList-btn" onClick={() => deleteOthersArrayTabeItem(index)}>DELETE</span>
                                                        </div>
                                                    </td>

                                                </tr>
                                            )

                                        })}


                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <div>
                            <div className="row mt-5">
                                <div className="col-sm-4">
                                    <h3 class="fs-title">Rejection</h3>
                                    <div className="container" style={{ marginTop: '30px' }}>
                                        <input type="text"
                                            placeholder="Rejection"
                                            value={Rejection}
                                            onChange={(e) => setRejection(e.target.value)}

                                        />

                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <h3 class="fs-title">Status Details</h3>
                                    <div className="container" style={{ marginTop: '30px' }}>
                                        <input type="text"
                                            placeholder="Approved By"
                                            value={ApprovedBy}
                                            onChange={(e) => setApprovedBy(e.target.value)}

                                        />
                                        <input type="text"
                                            placeholder="Approved Flag"
                                            value={ApprovedFlag}
                                            onChange={(e) => setApprovedFlag(e.target.value)}

                                        />
                                        <input type="date"
                                            placeholder="Approved Date"
                                            value={ApprovedDate}
                                            onChange={(e) => setApprovedDate(e.target.value)}

                                        />
                                    </div>

                                </div>
                                <div className="col-sm-4">
                                    <h3 class="fs-title">Costing Summary</h3>
                                    <div className="container" style={{ marginTop: '30px' }}>
                                        <input type="text"
                                            placeholder="Raw Mateial Costing"
                                            value={RawMaterialCost}
                                            onChange={(e) => setRawMaterialCost(e.target.value)}

                                        />
                                        <input type="text"
                                            placeholder="Knitting Cost"
                                            value={KnittingCost}
                                            onChange={(e) => setKnittingCost(e.target.value)}

                                        />
                                        <input type="text"
                                            placeholder="Process Cost"
                                            value={ProcessCost}
                                            onChange={(e) => setProcessCost(e.target.value)}


                                        />
                                        <input type="text"
                                            placeholder="Trims Cost"
                                            value={TrimsCost}
                                            onChange={(e) => setTrimsCost(e.target.value)}

                                        />
                                        <input type="text"
                                            placeholder="Other Cost"
                                            value={OtherCost}
                                            onChange={(e) => setOtherCost(e.target.value)}

                                        />
                                    </div>
                                </div >
                            </div>
                        </div>
                        <div className="styleLibrary-Btn-container" style={{ marginTop: '30px' }}>
                            <input type="button" name="next" class="next action-button" value="Upload" onClick={() => UploadStyleLib()} />
                            <input type="button" name="next" class="next action-button" value="Delete" />
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>




    )
}
export default PROCESS