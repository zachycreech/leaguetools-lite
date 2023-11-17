import { useContext } from "react";
import { styled } from "styled-components";
import { Tooltip } from "../../../../components";
import { LoLContext } from "../../../../context/context";

const StyledGrid = styled.div`
  display: grid;
  margin-top: 0.5rem;
  grid-template-columns: repeat(4, 1fr);
  grid-column-start: 5;
  grid-column-end: 8;
  gap: 2px;
`;

const Div = styled.div`
  & > div {
    margin: 0.25rem;
  }
`;

const ItemList = ({ player }: any) => {
  const lolContext = useContext(LoLContext);
  const allItems = lolContext.items;
  const item: string[] = [];
  const tooltipItem: string[] = [];
  const blankItem = "7050";
  const stats = player.stats;

  for (let index = 0; index < 7; index++) {
    const itemIndex = `item${index}`;
    const itemId = stats[itemIndex];
    if (itemId === 0) {
      item.push(blankItem);
      tooltipItem.push("");
    } else {
      item.push(`${stats[`item${index}`]}`);
      tooltipItem.push(
        `<itemName>${allItems[Number(itemId)].name}</itemName> <br />${
          allItems[Number(itemId)].description
        }`,
      );
    }
  }

  const itemImage = (item: string): string => {
    return `https://raw.githubusercontent.com/InFinity54/LoL_DDragon/master/latest/img/item/${item}.png`;
  };

  return (
    <StyledGrid>
      <Tooltip tooltip={tooltipItem[0]}>
        <Div>
          <img src={itemImage(item[0])} alt="Item" />
        </Div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[1]}>
        <Div>
          <img src={itemImage(item[1])} alt="Item" />
        </Div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[2]}>
        <Div>
          <img src={itemImage(item[2])} alt="Item" />
        </Div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[6]}>
        <Div>
          <img src={itemImage(item[6])} alt="Item" />
        </Div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[3]}>
        <Div>
          <img src={itemImage(item[3])} alt="Item" />
        </Div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[4]}>
        <Div>
          <img src={itemImage(item[4])} alt="Item" />
        </Div>
      </Tooltip>
      <Tooltip tooltip={tooltipItem[5]}>
        <Div>
          <img src={itemImage(item[5])} alt="Item" />
        </Div>
      </Tooltip>
      <Div />
    </StyledGrid>
  );
};

export default ItemList;
