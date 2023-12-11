/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSignal, onMount, For } from "solid-js";
import {
  clearHistory,
  createNotification,
  defaultOptions,
} from "../clearHistory";
import { useTranslations } from "../i18n/utils";
import { styled } from "solid-styled-components";

const Container = styled("div")`
`;

const Text = styled("div")`
  color: #333;
  font-size: 19.2px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const FormCheck = styled("div")`
  margin-bottom: 4.8px;
  font-size: 16px;
  user-select: none;
`;

const CheckInput = styled("input")`
  cursor: pointer;
  appearance: none;
  width: 16px;
  height: 16px;
  vertical-align: middle;
  background-color: #f4f4f4;
  border: 1px solid #dcdcdc;
  border-radius: 3px;

  &:checked {
    background-color: #3f51b5;
  }
`;

const SubmitButton = styled("button")`
  cursor: pointer;
  color: #fff;
  background-color: #3f51b5;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  text-transform: uppercase;
  padding: 6px 16px;
  font-size: 0.875rem;
  line-height: 1.75;
  border-radius: 4px;
  letter-spacing: 0.02857em;
  text-decoration: none;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #303f9f;
  }
  
  &:active {
    background-color: #283593;
  }
  
  &:focus {
    outline: none;
  }
`;

export const Settings = () => {
  const [options, setOptions] = createSignal(defaultOptions);
  const [removeTabs, setRemoveTabs] = createSignal(false);
  const t = useTranslations();

  onMount(async () => {
    const optionsResult = await chrome.storage.sync.get(["options"]);
    const tabsResult = await chrome.storage.sync.get(["tabs"]);

    if (optionsResult?.options) {
      setOptions({ ...options(), ...optionsResult?.options });
    }

    if (tabsResult?.tabs) {
      setRemoveTabs(tabsResult.tabs.removeTabs);
    }
  });

  const saveSettings = async () => {
    await chrome.storage.sync.set({
      options: options(),
      tabs: {
        removeTabs: removeTabs(),
      },
    });
    await createNotification(t("notification.saved"));

    setTimeout(async () => {
      await chrome.notifications.clear("RRNotification");
    }, 1000);
  };

  return (
    <Container>
      <Text>{t("whatShouldBeRemoved")}</Text>
      <For each={Object.entries(options())}>
        {([key, value]) => (
          <FormCheck>
            <label>
              <CheckInput
                id={key}
                checked={value}
                type="checkbox"
                onChange={() => {
                  setOptions({ ...options(), [key]: !value });
                  saveSettings();
                }}
              />
              {t(key as any)}
            </label>
          </FormCheck>
        )}
      </For>
      <Text style={{ "margin-top": '20px'}}>{t("removeOrReload")}</Text>
      <FormCheck>
        <label>
          <CheckInput
            id="refresh"
            checked={!removeTabs()}
            type="checkbox"
            onChange={() => {
              setRemoveTabs(!removeTabs());
              saveSettings();
            }}
          />
          {t("refresh")}
        </label>
      </FormCheck>
      <FormCheck>
        <label>
          <CheckInput
            id="remove"
            checked={removeTabs()}
            type="checkbox"
            onChange={() => {
              setRemoveTabs(!removeTabs());
              saveSettings();
            }}
          />
          {t("remove")}
        </label>
      </FormCheck>
      <br />
      <SubmitButton type="submit" onClick={clearHistory}>
        {t("cleanHistory")}
      </SubmitButton>
    </Container>
  );
};
